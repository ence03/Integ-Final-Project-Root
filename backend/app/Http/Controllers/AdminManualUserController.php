<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AllUsers;
use App\Models\Role;

class AdminManualUserController extends Controller
{
    public function create()
    {
        $roles = Role::all();
        return view('admin.createUsers.UserManual', compact('roles'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'RoleID' => 'required|integer|exists:roles,RoleID',
            'Username' => 'required|string|max:255|unique:all_users,Username',
            'Password' => 'required|string|min:8',
        ]);

        AllUsers::create($validated);

        return redirect()->route('admin.createUsers.create')->with('success', 'User created successfully.');
    }
}
