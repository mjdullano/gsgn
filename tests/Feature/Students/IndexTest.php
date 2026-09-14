<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('students.index'));

    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the students page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('students.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('students/index')
        ->has('students', 0));
});
