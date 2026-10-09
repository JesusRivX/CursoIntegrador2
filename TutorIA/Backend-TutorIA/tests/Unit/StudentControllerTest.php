<?php

use App\Http\Controllers\StudentController;
use App\Models\User;
use App\Services\StudentService;
use Illuminate\Http\Request;
use Mockery;

beforeEach(function () {
    $this->studentService = Mockery::mock(StudentService::class);
    $this->controller = new StudentController();

    // Usuario simulado.
    $this->user = new User();
    $this->user->id = 10;

    // Petición con usuario autenticado.
    $this->request = Request::create(
        '/api/student/dashboard-cursos',
        'GET'
    );

    $this->request->setUserResolver(fn() => $this->user);
});

/*
|--------------------------------------------------------------------------
| dashboard_cursos
|--------------------------------------------------------------------------
*/

test('devuelve los cursos del estudiante correctamente', function () {
    $datos = [
        (object) [
            'curso_id' => 1,
            'curso_codigo' => 'CUR-001',
            'curso_nombre' => 'Curso de Laravel',
            'curso_descripcion' => 'Aprende Laravel',
            'nivel_educativo' => 'Superior',
            'grado' => 'Primer grado',
            'cantidad_cursos' => 1,
            'cantidad_temas' => 3,
        ],
    ];

    $this->studentService
        ->shouldReceive('mis_cursos')
        ->once()
        ->with($this->user->id)
        ->andReturn($datos);

    $response = $this->controller->dashboard_cursos(
        $this->request,
        $this->studentService
    );

    expect($response->getStatusCode())->toBe(200)
        ->and($response->getData(true)['message'])
        ->toBe('Cursos obtenidos correctamente')
        ->and($response->getData(true)['data']['grado'])
        ->toBe('Primer grado')
        ->and($response->getData(true)['data']['cursos'][0]['id'])
        ->toBe(1);
});

/*
|--------------------------------------------------------------------------
| curso_detalle
|--------------------------------------------------------------------------
*/

test('devuelve el detalle del curso correctamente', function () {
    $cursoId = 5;

    $datos = [
        (object) [
            'curso_id' => $cursoId,
            'curso_codigo' => 'CUR-005',
            'curso_nombre' => 'Curso de Laravel',
            'curso_descripcion' => 'Aprende Laravel desde cero',
            'nivel_educativo' => 'Superior',
            'grado' => 'Primer grado',
            'cantidad_temas' => 2,

            // Primer tema.
            'tema_id' => 1,
            'tema_nombre' => 'Introducción a Laravel',
            'tema_descripcion' => 'Conceptos básicos',
            'progreso' => 100,
            'estado' => 'Completado',
        ],
        (object) [
            'curso_id' => $cursoId,
            'curso_codigo' => 'CUR-005',
            'curso_nombre' => 'Curso de Laravel',
            'curso_descripcion' => 'Aprende Laravel desde cero',
            'nivel_educativo' => 'Superior',
            'grado' => 'Primer grado',
            'cantidad_temas' => 2,

            // Segundo tema.
            'tema_id' => 2,
            'tema_nombre' => 'Rutas en Laravel',
            'tema_descripcion' => 'Creación de rutas',
            'progreso' => 0,
            'estado' => 'Pendiente',
        ],
    ];

    $this->studentService
        ->shouldReceive('mi_curso_detalle')
        ->once()
        ->with($this->user->id, $cursoId)
        ->andReturn($datos);

    $response = $this->controller->curso_detalle(
        $this->request,
        $cursoId,
        $this->studentService
    );

    expect($response->getStatusCode())->toBe(200)
        ->and($response->getData(true)['message'])
        ->toBe('Curso obtenido correctamente')
        ->and($response->getData(true)['data']['curso_id'])
        ->toBe($cursoId)
        ->and($response->getData(true)['data']['cantidad_temas'])
        ->toBe(2)
        ->and($response->getData(true)['data']['temas'])
        ->toHaveCount(2);
});

/*
|--------------------------------------------------------------------------
| curso_temas
|--------------------------------------------------------------------------
*/

test('devuelve el tema del curso correctamente', function () {
    $cursoId = 5;
    $temaId = 2;

    $datos = [
        (object) [
            'curso_id' => $cursoId,
            'curso_codigo' => 'CUR-005',
            'curso_nombre' => 'Curso de Laravel',
            'curso_descripcion' => 'Aprende Laravel',

            'nivel_educativo_id' => 1,
            'nivel_educativo' => 'Superior',

            'grado_id' => 1,
            'grado' => 'Primer grado',

            'student_id' => 10,
            'student_course_id' => 15,
            'grade_course_id' => 20,

            'tema_id' => $temaId,
            'tema_nombre' => 'Rutas en Laravel',
            'tema_descripcion' => 'Aprende a definir rutas',

            'archivo_nombre' => 'rutas.pdf',
            'tiene_material' => true,

            'progreso' => 50,
            'estado' => 'En progreso',

            // Datos del ejemplo asociado al tema.
            'ejemplo_id' => 1,
            'ejemplo_titulo' => 'Ejemplo de rutas',
            'ejemplo_problema' => 'Crear una ruta GET',
            'ejemplo_solucion' => 'Route::get(...)',
            'ejemplo_respuesta' => 'Ruta creada correctamente',
        ],
    ];

    $this->studentService
        ->shouldReceive('mi_curso_temas')
        ->once()
        ->with($this->user->id, $cursoId, $temaId)
        ->andReturn($datos);

    $response = $this->controller->curso_temas(
        $this->request,
        $cursoId,
        $temaId,
        $this->studentService
    );

    expect($response->getStatusCode())->toBe(200)
        ->and($response->getData(true)['message'])
        ->toBe('Tema obtenido correctamente')
        ->and($response->getData(true)['data']['curso_id'])
        ->toBe($cursoId)
        ->and($response->getData(true)['data']['tema_id'])
        ->toBe($temaId)
        ->and($response->getData(true)['data']['progreso'])
        ->toBe(50);
});

/*
|--------------------------------------------------------------------------
| actualizar_progreso_tema
|--------------------------------------------------------------------------
*/

test('actualiza correctamente el progreso del tema', function () {
    $cursoId = 5;
    $temaId = 2;

    $this->studentService
        ->shouldReceive('actualizar_progreso_tema')
        ->once()
        ->with($cursoId, $temaId)
        ->andReturn(true);

    $response = $this->controller->actualizar_progreso_tema(
        $cursoId,
        $temaId,
        $this->studentService
    );

    expect($response->getStatusCode())->toBe(200)
        ->and($response->getData(true)['message'])
        ->toBe('Progreso del tema actualizado correctamente');
});
