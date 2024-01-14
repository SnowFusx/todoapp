import { DeleteIcon } from './icons';
import { Button } from './Button';

export const Tarea = ({ tarea, handleEliminar, handleCompletar }) => {
	const { completada } = tarea;

	const estiloCompletada = completada ? 'tareaCompletadaBox' : '';

	return (
		<>
			<button
				className='w-full'
				onClick={e => {
					e.preventDefault;
					handleCompletar(tarea.id);
				}}
				onContextMenu={e => {
					e.preventDefault();
					handleEliminar(tarea.id);
				}}
			>
				<div className={`tareaIndividual ${estiloCompletada}`}>
					<div
						className={`${
							tarea.completada ? 'tareaCompletadaText' : ''
						} tareaTexto`}
					>
						{tarea.tarea}{' '}
					</div>
					<div className='tareaBtnContainer'></div>
				</div>
			</button>
		</>
	);
};
