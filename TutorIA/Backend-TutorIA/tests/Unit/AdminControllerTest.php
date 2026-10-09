<?php

use App\Http\Controllers\AdminController;
use App\Services\AdminService;
use Mockery;

beforeEach(function () {
    $this->adminService = Mockery::mock(AdminService::class);
    $this->controller = new AdminController();
});

/*
|--------------------------------------------------------------------------
| dashboard_inicio_kpi
|--------------------------------------------------------------------------
*/

test('devuelve los KPI de inicio correctamente', function () {
    $datos = [
        'total_usuarios' => 100,
        'total_cursos' => 20,
    ];

    $this->adminService
        ->shouldReceive('dashboard_inicio_kpi')
        ->once()
        ->andReturn($datos);

    $response = $this->controller->dashboard_inicio_kpi(
        $this->adminService
    );

    expect($response->getStatusCode())->toBe(200)
        ->and($response->getData(true)['message'])
        ->toBe('KPI obtenidos correctamente')
        ->and($response->getData(true)['data'])
        ->toBe($datos);
});

test('devuelve 404 cuando no existen KPI de inicio', function () {
    $this->adminService
        ->shouldReceive('dashboard_inicio_kpi')
        ->once()
        ->andReturn(null);

    $response = $this->controller->dashboard_inicio_kpi(
        $this->adminService
    );

    expect($response->getStatusCode())->toBe(404)
        ->and($response->getData(true)['message'])
        ->toBe('No se encontraron resultados');
});

/*
|--------------------------------------------------------------------------
| kpi_usuarios
|--------------------------------------------------------------------------
*/

test('devuelve los KPI de usuarios correctamente', function () {
    $datos = [
        'total_estudiantes' => 50,
        'total_administradores' => 5,
    ];

    $this->adminService
        ->shouldReceive('kpi_usuarios')
        ->once()
        ->andReturn($datos);

    $response = $this->controller->kpi_usuarios(
        $this->adminService
    );

    expect($response->getStatusCode())->toBe(200)
        ->and($response->getData(true)['message'])
        ->toBe('KPI de usuarios obtenidos correctamente')
        ->and($response->getData(true)['data'])
        ->toBe($datos);
});

test('devuelve 404 cuando no existen KPI de usuarios', function () {
    $this->adminService
        ->shouldReceive('kpi_usuarios')
        ->once()
        ->andReturn(null);

    $response = $this->controller->kpi_usuarios(
        $this->adminService
    );

    expect($response->getStatusCode())->toBe(404)
        ->and($response->getData(true)['message'])
        ->toBe('No se encontraron resultados');
});

/*
|--------------------------------------------------------------------------
| usuarios
|--------------------------------------------------------------------------
*/

test('devuelve la lista de usuarios correctamente', function () {
    $usuarios = [
        ['id' => 1, 'name' => 'Juan'],
        ['id' => 2, 'name' => 'Maria'],
    ];

    $this->adminService
        ->shouldReceive('usuarios')
        ->once()
        ->andReturn($usuarios);

    $response = $this->controller->usuarios(
        $this->adminService
    );

    expect($response->getStatusCode())->toBe(200)
        ->and($response->getData(true)['message'])
        ->toBe('Usuarios obtenidos correctamente')
        ->and($response->getData(true)['data'])
        ->toBe($usuarios);
});

test('devuelve 404 cuando no hay usuarios', function () {
    $this->adminService
        ->shouldReceive('usuarios')
        ->once()
        ->andReturn(null);

    $response = $this->controller->usuarios(
        $this->adminService
    );

    expect($response->getStatusCode())->toBe(404)
        ->and($response->getData(true)['message'])
        ->toBe('No se encontraron resultados');
});
