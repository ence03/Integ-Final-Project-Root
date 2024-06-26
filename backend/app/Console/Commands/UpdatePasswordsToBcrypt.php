<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UpdatePasswordsToBcrypt extends Command
{
    protected $signature = 'update:passwords';
    protected $description = 'Update passwords to use Bcrypt hashing';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $users = DB::table('all_users')->get();

        foreach ($users as $user) {
            // Skip users who already have a Bcrypt hash
            if (Hash::needsRehash($user->Password)) {
                $hashedPassword = Hash::make($user->Password);
                DB::table('all_users')
                    ->where('UserID', $user->UserID)
                    ->update(['Password' => $hashedPassword]);
            }
        }

        $this->info('Passwords updated successfully.');
    }
}
