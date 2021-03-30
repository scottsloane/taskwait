const hyperid = require('hyperid')({fixedLength:true});

module.exports = ((options)=>{

    const _options = {
        attempts : 15,
        interval : 500
    }

    if(typeof options !== 'undefined') {
        if(typeof options.attempts === 'number') _options.attempts = options.attempts;
        if(typeof options.interval === 'number') _options.interval = options.interval;
    }

    const tasks = {};

    const start = (_id, _fn) => {
        if(typeof _fn === 'undefined' && typeof _id !== 'function'){
            if(typeof _id === 'undefined') _id = hyperid();
            tasks[_id] = true;
            return _id;
        }
        if(typeof _fn === 'undefined') {
            _fn = _id;
            _id = hyperid();
        }
        
        tasks[_id] = true;
        return new Promise((resolve, reject)=>{
            try {
                _fn().then(res=>{
                    finish(_id);
                    return resolve(res);
                });
            }catch(err){
                return reject(err);
            }
        }) 

    }

    const finish = (_id) => {
        delete tasks[_id];
    }

    const wait = () => {
        return new Promise(async(resolve,reject)=>{
            let t = null;
            let c = _options.attempts;
            let fn = () => {
                if(t !== null) clearTimeout(t);
                if(Object.keys(tasks).length === 0 || c === 0) return resolve;
                else {
                    if(c !== -1) c--;
                    return t = setTimeout(fn,_options.interval)
                }
            }
        })
    }

    return {
        start,
        finish,
        wait
    }
});