import { FormTarea } from './components/FormTarea';

function App() {
	return (
		<div id='App'>
			<div className='bg-indigo-900 bg-opacity-60 p-10 rounded-md shadow-lg'>
				<h1 className='text-4xl font-bold text-white mb-2'>TODO APP</h1>
				<FormTarea />
			</div>
		</div>
	);
}

export default App;
