<!-- resources/views/instructors/index.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Instructors</h1>
    <ul class="list-group">
        @foreach($instructors as $instructor)
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <a href="{{ route('instructors.courses', ['id' => $instructor->InstructorID]) }}">{{ $instructor->FirstName ?? '' }} {{ $instructor->MiddleName ?? '' }} {{ $instructor->LastName }}</a>
            <a href="{{ route('instructors.edit', ['id' => $instructor->InstructorID]) }}" class="btn btn-primary">Edit</a>
        </li>
        @endforeach
    </ul>
</div>
@endsection
