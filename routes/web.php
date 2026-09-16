<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'auth/login')->name('home');

Route::get('students', [StudentController::class, 'index'])->name('students.index');
Route::post('students', [StudentController::class, 'store'])->name('students.store');
Route::inertia('subjects', 'subjects/index')->name('subjects.index');
Route::post('subjects', function () {
    return to_route('subjects.index')->with('success', 'Subject added successfully.');
})->name('subjects.store');
Route::inertia('classes-sections', 'classes-sections/index')->name('classes-sections.index');
Route::post('classes-sections', function () {
    return to_route('classes-sections.index')->with('success', 'Class/Section added successfully.');
})->name('classes-sections.store');
Route::inertia('enrollment', 'enrollment/index')->name('enrollment.index');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

});

require __DIR__.'/settings.php';
