/*
 *  @Soldy\OMQrc\2021.01.26\GPL3
 */
'use strict';

/*
 * @prototype
 */
const OMQBase = function(){
    /*
     * @public
     * @return {json<int>}
     */
    this.stat = function(){
        return {
            added    : parseInt(stat.added),
            messages : parseInt(stat.messages),
            inited   : parseInt(stat.inited),
            last     : parseInt(stat.last),
            build    : parseInt(stat.build)
        };

    };

    /*
     * @param {string} subject
     * @param {function} func
     * @public
     * @return {void}
     */
    this.add = function(subject, func){
        if(typeof func !== 'function')
            throw TypeError(
                'the second paramater have to be a function but is a "'+
                (typeof func)+
                '"'
            );
        if(typeof subject !== 'string')
            throw TypeError(
                'the first paramater have to be a string but is a "'+
                (typeof subject)+
                '"'
            );
        if(listeners[subject] === 'undefined')
            listeners[subject] = [];
        let date = Date.now();
        listeners.push({
            added  :date,
            func   :func,
            called :0,
            error  :'',
            failed :false,
            message:'',
            last   :0
        });
        if(subjects[subject] === 'undefined')
            subjects[subject] = {
                message :'',
                called  :0,
                last    :0,
                added   :date
            };
    };
    /*
     * @param {string} subject
     * @public
     * @return {any}
     */
    this.get = function(subject){
        if(subjects[subject] === 'undefined')
            return undefined;
        return subjects[subject];
    };
    /*
     * @param {string} subject
     * @param {string} message 
     * @public
     * @return {void}
     */
    this.message = function(subject, message){
        let now = Date.now();
        stat.messages++;
        stat.last = now;
        if(listeners[subject] === 'undefined')
            return ;
        subjects[subject].message = message;
        subjects[subject].last    = now;
        subjects[subject].called++ ;
        for (let i in listeners[subject]){
            try{
                listeners[subject][i].called++;
                listeners[subject][i].last = now;
                listeners[subject][i].func(message);
                listeners[subject][i].message = message;
            }catch(e){
                listeners[subject][i].error  = e;
                listeners[subject][i].failed = true;
            }
        }
    };
    /*
     * @private
     * @var {object}
     */
    let subjects = {};
    /*
     * @private
     * @var {object}
     */
    let listeners = {};
    /*
     * @private
     * @var {object}
     */
    let stat = {
        added    : 0,
        messages : 0,
        inited   : (+new Date),
        last     : (+new Date),
        build    : 1
    };
};

exports.OMQBase = OMQBase;
exports.base = OMQBase;


