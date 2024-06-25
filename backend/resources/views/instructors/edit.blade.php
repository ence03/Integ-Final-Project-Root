<!-- resources/views/instructors/edit.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Edit Instructor</h1>
    <form action="{{ route('instructors.update', $instructor->InstructorID) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="FirstName">First Name</label>
            <input type="text" class="form-control" id="FirstName" name="FirstName" value="{{ $instructor->FirstName }}" required>
        </div>

        <div class="form-group">
            <label for="MiddleName">Middle Name</label>
            <input type="text" class="form-control" id="MiddleName" name="MiddleName" value="{{ $instructor->MiddleName }}">
        </div>

        <div class="form-group">
            <label for="LastName">Last Name</label>
            <input type="text" class="form-control" id="LastName" name="LastName" value="{{ $instructor->LastName }}" required>
        </div>
        <div class="form-group">
            <label for="Email">Email</label>
            <input type="email" name="Email" class="form-control" value="{{ $instructor->Email }}">
        </div>
        <div class="form-group">
            <label for="Address">Address</label>
            <input type="text" name="Address" class="form-control" value="{{ $instructor->Address }}">
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
    </form>
</div>
@endsection
