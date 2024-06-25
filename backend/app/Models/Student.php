<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $table = 'students';
    protected $primaryKey = 'StudentID';
    public $incrementing = false;
    protected $keyType = 'int';

    // Enable timestamps
    public $timestamps = true;

    protected $fillable = [
        'UserID',
        'FirstName',
        'MiddleName',
        'LastName',
        'Email',
        'Address',
        'Birthdate',
        'ContactNumber',
        'EnrollmentStatus',
    ];

    protected $casts = [
        'Birthdate' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'UserID', 'UserID');
    }
}
