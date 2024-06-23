<!DOCTYPE html>
<html>
<head>
    <title>Enroll Student</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#Course_InstructorID').change(function() {
                var selectedOption = $(this).find('option:selected');
                var courseID = selectedOption.data('courseid');
                var instructorName = selectedOption.data('instructorname');
                $('#CourseID').val(courseID);
                $('#InstructorName').val(instructorName);
            });
        });
    </script>
</head>
<body>
<div class="container">
    <h2>Enroll Student</h2>
    <form action="{{ route('enrollments.store') }}" method="POST">
        @csrf
        <div class="form-group">
            <label for="Year_SemID">Year Semester:</label>
            <select class="form-control" id="Year_SemID" name="Year_SemID" required>
                @foreach($yearSemesters as $yearSemester)
                    <option value="{{ $yearSemester->Year_SemID }}">{{ $yearSemester->YearLevel }} - {{ $yearSemester->Sem }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label for="StudentID">Student:</label>
            <select class="form-control" id="StudentID" name="StudentID" required>
                @foreach($students as $student)
                    <option value="{{ $student->StudentID }}">{{ $student->FirstName }} {{ $student->LastName }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label for="Course_InstructorID">Course Instructor:</label>
            <select class="form-control" id="Course_InstructorID" name="Course_InstructorID" required>
                @foreach($courseInstructors as $courseInstructor)
                    <option value="{{ $courseInstructor->Course_InstructorID }}"
                            data-courseid="{{ $courseInstructor->course->CourseID }}"
                            data-instructorname="{{ $courseInstructor->instructor->FirstName }} {{ $courseInstructor->instructor->LastName }}">
                        {{ $courseInstructor->Course_InstructorID }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label for="CourseID">Course ID:</label>
            <input type="text" class="form-control" id="CourseID" name="CourseID" readonly>
        </div>
        <div class="form-group">
            <label for="InstructorName">Instructor Name:</label>
            <input type="text" class="form-control" id="InstructorName" name="InstructorName" readonly>
        </div>
        <button type="submit" class="btn btn-primary">Enroll</button>
    </form>
</div>
</body>
</html>
