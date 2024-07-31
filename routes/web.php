<?php

use App\Http\Controllers\CompanyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/company', [CompanyController::class, 'index'])->name('company.index');
Route::get('/company/create', [CompanyController::class, 'create'])->name('company.create');
Route::get('/company/edit/{id?}', [CompanyController::class, 'edit'])->name('company.edit');
Route::get('/company/store', [CompanyController::class, 'store'])->name('company.store');
Route::put('/company/update/{id?}', [CompanyController::class, 'update'])->name('company.update');
Route::delete('/company/destroy/{id?}', [CompanyController::class, 'destroy'])->name('company.destroy');
