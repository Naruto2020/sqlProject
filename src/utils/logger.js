import logger from 'pino';

const log = logger(
    {
        base: {
            pid: false
        },
        transport: {
            target: 'pino-pretty',
            options:{
                colorized: true
            }
        },
        timestamp:() =>{
            return `,"time": "${new Date().toLocaleString()}"`
        }
    }
);

export default log;