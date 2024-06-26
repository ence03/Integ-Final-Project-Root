<?php

namespace App\Http\Controllers;
//Importing CSV for creating Student Accounts
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AdminStudentCSVController extends Controller
{
    public function showUploadForm()
    {
        return view('admin.addStudent.StudentCSV');
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

        $students = [];
        foreach ($data as $row) {
            $students[] = [
                'UserID' => $row[0],
                'FirstName' => $row[1],
                'MiddleName' => $row[2],
                'LastName' => $row[3],
                'Email' => $row[4],
                'Address' => $row[5],
                'Birthdate' => $row[6],
                'ContactNumber' => $row[7],
                'EnrollmentStatus' => $row[8],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('students')->insert($students);

        return redirect()->route('admin.addStudent.upload')->with('success', 'Students imported successfully.');
    }
}
