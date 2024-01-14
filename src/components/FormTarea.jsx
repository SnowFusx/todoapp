import { useEffect, useState } from 'react';
import { Tarea } from './Tarea';
import { v4 as uuidv4 } from 'uuid';
import { DeleteIcon, CheckIcon } from './icons';

const items = JSON.parse(localStorage.getItem('tareas')) ?? [];

export const FormTarea = () => {
	const [tareas, setTareas] = useState(items);
	const [tareasActuales, setTareasActuales] = useState(items);
	const [tarea, setTarea] = useState({});
	const [input, setInput] = useState('');
	const [filtro, setFiltro] = useState('All');

	// --- Añadir Tarea ---

	const handleChange = e => {
		setInput(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (input === '') return;
		const uuid = uuidv4();
		setTarea({
			id: uuid,
			tarea: input,
			completada: false,
		});
	};

	useEffect(() => {
		if (Object.entries(tarea).length === 0) return;
		setTareas([...tareas, tarea]);
		setTareasActuales([...tareasActuales, tarea]);
		setInput('');
		setTarea({});
	}, [tarea]);

	// --- Fin añadir tarea ---

	// --- Actualizar localstorage ---

	useEffect(() => {
		localStorage.setItem('tareas', JSON.stringify(tareas));
	}, [tareas, tareasActuales]);

	// --- Fin actualizar localstorage

	// --- Filtrar ---

	const cambiarFiltro = e => {
		setFiltro(e);
		setTareasActuales(tareas);
	};

	useEffect(() => {
		switch (filtro) {
			case 'All':
				setTareasActuales(tareas);
				return;

			case 'Completadas':
				const tareasCompletadas = tareasActuales.filter(
					tarea => tarea.completada !== false
				);
				setTareasActuales(tareasCompletadas);
				return;

			case 'Incompletas':
				const tareasIncompletas = tareasActuales.filter(
					tarea => tarea.completada == false
				);
				setTareasActuales(tareasIncompletas);
				return;

			default:
				break;
		}
	}, [filtro]);

	// --- Fin filtrar ---

	// --- Acciones tareas ---

	const handleEliminar = tareaId => {
		const tareasActualizadas = tareasActuales.filter(
			tarea => tarea.id !== tareaId
		);

		setTareasActuales(tareasActualizadas);
		setTareas(tareasActualizadas);
	};

	const handleCompletar = tareaId => {
		// e.preventDefault();
		const tareaAActualizar = tareasActuales.map(tarea => {
			if (tarea.id === tareaId) {
				tarea.completada = !tarea.completada;
			}
			return tarea;
		});
		setTareas(tareaAActualizar);
	};

	// --- Fin acciones tareas ---

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='tarea'
					id='tarea'
					placeholder='Escribe tu tarea'
					maxLength='20'
					onChange={handleChange}
					value={input}
				/>

				<input type='submit' value='Añadir Tarea' />
			</form>
			<div className='filtersContainer'>
				<button
					className='btnFilter btnAll'
					onClick={() => cambiarFiltro('All')}
				>
					Ver todas
				</button>
				<button
					className={`btnFilter btnCompletadas ${
						filtro === 'Completadas' ? 'btnFilterSelected' : ''
					}`}
					onClick={() => cambiarFiltro('Completadas')}
				>
					Completadas
				</button>
				<button
					className={`btnFilter btnIncompletas ${
						filtro === 'Incompletas' ? 'btnFilterSelected' : ''
					}`}
					onClick={() => cambiarFiltro('Incompletas')}
				>
					Incompletas
				</button>
			</div>

			<div className='tareasContainer'>
				{tareasActuales && tareasActuales.length > 0 ? (
					tareasActuales.map(tarea => (
						<Tarea
							key={tarea?.id}
							tarea={tarea}
							handleEliminar={handleEliminar}
							handleCompletar={handleCompletar}
						/>
					))
				) : (
					<p className='mt-5 text-white text-center'>
						No hay tareas {filtro === 'All' ? '' : filtro}
					</p>
				)}
			</div>
			<div className='mt-5 flex justify-between text-white'>
				<div className='flex gap-1 justify-center content-center'>
					<CheckIcon />
					<p className='text-xs mt-[2px]'>Left click completar</p>
				</div>
				<div className='flex gap-1'>
					<p className='text-xs mt-[2px]'>Right click eliminar</p>
					<DeleteIcon />
				</div>
			</div>
		</div>
	);
};
