<?php

test('can visit the enrollment page', function () {
    $response = $this->get(route('enrollment.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('enrollment/index'));
});
