<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    // Specify the table if the table name does not follow Laravel's naming convention
    protected $table = 'students';

    // Specify the primary key if it is not 'id'
    protected $primaryKey = 'StudentID';

    // Specify if the primary key is not an incrementing integer
    public $incrementing = false;

    // Specify the data type of the primary key
    protected $keyType = 'int';

    // Specify which attributes should be mass-assignable
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

    // Specify the attributes that should be cast to native types
    protected $casts = [
        'Birthdate' => 'date',
    ];

    // Define the relationship to the User model if there is a User model
    public function user()
    {
        return $this->belongsTo(User::class, 'UserID', 'UserID');
    }

    // Other relationships can be defined here as needed
}
