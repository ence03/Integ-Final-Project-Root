<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AllUsers; 
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log; // Add this line

class AdminCSVUserController extends Controller
{
    public function import(Request $request)
    {
        Log::info('AdminCSVUserController import method called'); // Add this line
        Log::info('Request Method: ' . $request->method());

        $file = $request->file('file');
        $existingUsersMessage = '';

        // Open the CSV file
        if (($handle = fopen($file->getPathname(), 'r')) !== false) {
            // Skip the header row
            fgetcsv($handle, 1000, ',');

            DB::beginTransaction();
            try {
                while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                    // Assuming CSV columns: RoleID, Username, Password

                    // Check if the username already exists
                    $existingUser = AllUsers::where('Username', $data[1])->first();

                    if ($existingUser) {
                        // If user exists, prepare a message
                        $existingUsersMessage .= "Username: {$data[1]} already exists.\n";
                        continue;
                    }

                    // Create user
                    AllUsers::create([
                        'RoleID' => $data[0],
                        'Username' => $data[1],
                        'Password' => Hash::make($data[2]),
                    ]);
                }
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                return redirect()->back()->with('error', 'Error importing CSV: ' . $e->getMessage());
            }
        }

        // Prepare appropriate messages
        $message = 'CSV file imported successfully.';
        if (!empty($existingUsersMessage)) {
            $message .= nl2br("\nSome records were not imported due to existing usernames:\n" . $existingUsersMessage);
        }

        return redirect()->back()->with('success', $message);
    }
}
