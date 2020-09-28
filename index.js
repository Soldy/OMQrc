
const OMQBase = function(){
    this.stat = function(){
        return stat;
    }
    this.add = function(subject, func){
        if(
            (typeof func !== 'function')||
            (typeof subject !== 'string')
        )
            return false;
        if(listeners[subject] === 'undefined')
            listeners[subject] = [];
        listeners.push({
             added  :(+new Date),
             func   :func,
             called :0,
             error  :"",
             failed :false,
             last   :0
        });

    }
    this.message = function(isubject, message){
        let now = (+new Date);
        stat.messages++;
        stat.last = now;
        if(listeners[subject] === 'undefined')
           return false;
        for (let i in listeners[subject]){
            try{
                listeners[subject][i].called++;
                listeners[subject][i].last = now;
                listeners[subject][i].func(message);
            }catch(e){
                listeners[subject][i].error  = e;
                listeners[subject][i].failed = true;
            }
        }
        return true;
    }

    let listeners = {}
    let stat = {
        added    : 0,
        messages : 0,
        inited   : (+new Date),
        last     : (+new Date),
        build    : 1
    }
}

exports.init = function (){
    global.OMQE = new MQBase();
}


