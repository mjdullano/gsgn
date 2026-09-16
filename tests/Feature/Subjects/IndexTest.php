<?php

test('can visit the subjects page', function () {
    $response = $this->get(route('subjects.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('subjects/index'));
});
