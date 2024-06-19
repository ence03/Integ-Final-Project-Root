<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function import(Request $request)
    {
        $file = $request->file('file');
        $existingRecordsMessage = '';

        // Open the CSV file
        if (($handle = fopen($file->getPathname(), 'r')) !== false) {
            // Skip the header row
            fgetcsv($handle, 1000, ',');

            DB::beginTransaction();
            try {
                while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                    // Assuming CSV columns: Year_SemID, StudentID, Course_InstructorID

                    // Check if the combination already exists
                    $existingRecord = Enrollment::where('StudentID', $data[1])
                                                ->where('Course_InstructorID', $data[2])
                                                ->first();

                    if ($existingRecord) {
                        // If record exists, prepare a message (you can customize this message as per your needs)
                        $existingRecordsMessage .= "Record with StudentID: {$data[1]} and Course_InstructorID: {$data[2]} already exists.\n";
                        continue;
                    }

                    // Create enrollment
                    Enrollment::create([
                        'Year_SemID' => $data[0],
                        'StudentID' => $data[1],
                        'Course_InstructorID' => $data[2],
                    ]);
                }
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                return redirect()->back()->with('error', 'Error importing CSV: ' . $e->getMessage());
            }
        }

        // Check if there were existing records found and prepare the appropriate message
        if (!empty($existingRecordsMessage)) {
            return redirect()->back()->with('warning', nl2br('Some records were not imported due to existing data:' . PHP_EOL . $existingRecordsMessage));
        }

        return redirect()->back()->with('success', 'CSV file imported successfully.');
    }
}
