import './DOM/events';
import Ships from './modules/Ships';
import './index.css';


const destroyer = new Ships('destroyer', 5);

const build = () => console.log('hello');

build()
console.log(destroyer)
