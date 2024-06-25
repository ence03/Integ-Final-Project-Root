<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;
use App\Models\Student; // Import the Student model
use Illuminate\Support\Facades\DB;

class AdminCSVEnrollment extends Controller
{
    public function import(Request $request)
    {
        $file = $request->file('file');
        $existingRecordsMessage = '';
        $missingStudentsMessage = '';

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
                        // If record exists, prepare a message
                        $existingRecordsMessage .= "Record with StudentID: {$data[1]} and Course_InstructorID: {$data[2]} already exists.\n";
                        continue;
                    }

                    // Check if the student exists
                    $student = Student::where('StudentID', $data[1])->first();

                    if (!$student) {
                        // If student does not exist, prepare a message
                        $missingStudentsMessage .= "StudentID: {$data[1]} does not exist in the students table.\n";
                        continue;
                    }

                    // Create enrollment
                    Enrollment::create([
                        'Year_SemID' => $data[0],
                        'StudentID' => $data[1],
                        'Course_InstructorID' => $data[2],
                    ]);

                    // Update student's enrollment status
                    $student->EnrollmentStatus = 'Enrolled'; // or any other status you need to set
                    $student->save();
                }
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                return redirect()->back()->with('error', 'Error importing CSV: ' . $e->getMessage());
            }
        }

        // Prepare appropriate messages
        $message = 'CSV file imported successfully.';
        if (!empty($existingRecordsMessage)) {
            $message .= nl2br("\nSome records were not imported due to existing data:\n" . $existingRecordsMessage);
        }
        if (!empty($missingStudentsMessage)) {
            $message .= nl2br("\nSome records were not imported due to missing students:\n" . $missingStudentsMessage);
        }

        return redirect()->back()->with('success', $message);
    }
}
