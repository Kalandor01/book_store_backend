<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KonyvController;

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
    return view('index');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/books', [KonyvController::class, 'index']);
Route::post('/books', [KonyvController::class, 'store']);
Route::put('/books/{id}', [KonyvController::class, 'update']);
Route::delete('/books/{id}', [KonyvController::class, 'destroy']);

require __DIR__ . '/auth.php';
