<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AdminInstructorCSVController extends Controller
{
    public function showUploadForm()
    {
        return view('admin.addInstructor.InstructorCSV');
    }

    public function importCSV(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt',
        ]);

        $path = $request->file('csv_file')->getRealPath();
        $data = array_map('str_getcsv', file($path));

        // Remove header row if present
        if (isset($data[0][0]) && $data[0][0] === 'UserID') {
            unset($data[0]);
        }

        $instructors = [];
        foreach ($data as $row) {
            $instructors[] = [
                'UserID' => $row[0],
                'FirstName' => $row[1],
                'MiddleName' => $row[2],
                'LastName' => $row[3],
                'Email' => $row[4],
                'Address' => $row[5],
            ];
        }

        try {
            DB::table('instructors')->insert($instructors);
            return redirect()->route('admin.addInstructor.upload')->with('success', 'Instructors imported successfully.');
        } catch (\Exception $e) {
            return redirect()->route('admin.addInstructor.upload')->with('error', 'Error importing instructors: ' . $e->getMessage());
        }
    }
}
