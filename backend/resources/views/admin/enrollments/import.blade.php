<!DOCTYPE html>
<html>
<head>
    <title>Import CSV</title>
</head>
<body>
    <h1>Import Students CSV</h1>
    <form action="{{ route('import.studentEnrollment') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="file" name="file" accept=".csv">
        <button type="submit">Import CSV</button>
    </form>


    @if(session('success'))
        <div style="color: green;">
            {!! nl2br(e(session('success'))) !!}
        </div>
    @endif

    @if(session('error'))
        <div style="color: red;">
            {{ session('error') }}
        </div>
    @endif

    @if(session('warning'))
        <div style="color: orange;">
            {!! nl2br(e(session('warning'))) !!}
        </div>
    @endif
</body>
</html>
