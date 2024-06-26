{{-- <!-- resources/views/enroll.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Enroll Student</h2>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <form method="POST" action="{{ route('enroll.submit') }}">
        @csrf

        <div class="form-group">
            <label for="StudentID">Student ID</label>
            <input type="text" id="StudentID" name="StudentID" class="form-control" required autocomplete="off">
            <ul id="student-list" class="list-group"></ul>
        </div>

        <div class="form-group">
            <label for="Course_InstructorID">Course Instructor ID</label>
            <input type="text" id="Course_InstructorID" name="Course_InstructorID" class="form-control" required autocomplete="off">
            <ul id="course-instructor-list" class="list-group"></ul>
        </div>

        <div class="form-group">
            <label for="Year_SemID">Year Semester ID</label>
            <input type="text" id="Year_SemID" name="Year_SemID" class="form-control" required autocomplete="off">
            <ul id="year-sem-list" class="list-group"></ul>
        </div>

        <button type="submit" class="btn btn-primary">Enroll Student</button>
    </form>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    $(document).ready(function() {
        $('#StudentID').on('keyup', function() {
            let query = $(this).val();
            $.ajax({
                url: "{{ route('search.students') }}",
                type: "GET",
                data: {'query': query},
                success: function(data) {
                    $('#student-list').empty();
                    if (data.length > 0) {
                        data.forEach(student => {
                            $('#student-list').append(`<li class="list-group-item student-item" data-id="${student.StudentID}">${student.StudentID} - ${student.name}</li>`);
                        });
                    }
                }
            });
        });

        $(document).on('click', '.student-item', function() {
            let studentID = $(this).data('id');
            $('#StudentID').val(studentID);
            $('#student-list').empty();
        });

        $('#Course_InstructorID').on('keyup', function() {
            let query = $(this).val();
            $.ajax({
                url: "{{ route('search.courseInstructors') }}",
                type: "GET",
                data: {'query': query},
                success: function(data) {
                    $('#course-instructor-list').empty();
                    if (data.length > 0) {
                        data.forEach(instructor => {
                            $('#course-instructor-list').append(`<li class="list-group-item instructor-item" data-id="${instructor.Course_InstructorID}">${instructor.Course_InstructorID} - ${instructor.name}</li>`);
                        });
                    }
                }
            });
        });

        $(document).on('click', '.instructor-item', function() {
            let instructorID = $(this).data('id');
            $('#Course_InstructorID').val(instructorID);
            $('#course-instructor-list').empty();
        });

        $('#Year_SemID').on('keyup', function() {
            let query = $(this).val();
            $.ajax({
                url: "{{ route('search.yearSems') }}",
                type: "GET",
                data: {'query': query},
                success: function(data) {
                    $('#year-sem-list').empty();
                    if (data.length > 0) {
                        data.forEach(yearSem => {
                            $('#year-sem-list').append(`<li class="list-group-item year-sem-item" data-id="${yearSem.Year_SemID}">${yearSem.Year_SemID} - ${yearSem.year} ${yearSem.semester}</li>`);
                        });
                    }
                }
            });
        });

        $(document).on('click', '.year-sem-item', function() {
            let yearSemID = $(this).data('id');
            $('#Year_SemID').val(yearSemID);
            $('#year-sem-list').empty();
        });
    });
</script>
@endsection --}}
