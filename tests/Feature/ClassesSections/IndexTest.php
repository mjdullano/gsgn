<?php

test('can visit the classes and sections page', function () {
    $response = $this->get(route('classes-sections.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('classes-sections/index'));
});
