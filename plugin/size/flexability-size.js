function getCof(m,d,sm,sd){
    return (d - m) / (sd - sm);
}

function getCorrect(cof,m,sm){
    return m - cof * sm;
}

function getForm(met,m,d,sm,sd,name = 'fd'){
    let cof = 0;
    let correct = 0;
    let type = m?.unit?.backupUnit||d?.unit?.backupUnit||'';
    if((type !== d?.unit?.backupUnit) && (d?.unit?.backupUnit !== undefined)){
        console.log("\x1b[31m",
        `invalid unit ${d?.unit?.backupUnit}, in ${name}(${m.value}${m?.unit?.backupUnit||''},${d.value}${d?.unit?.backupUnit||''})`,
        '\x1b[0m');
    }
    
    if(typeof m.value != 'number'){
        m.value = parseInt(m.value)||0;
    }
    if(typeof d.value != 'number'){
        d.value = parseInt(d.value)||0;
    }
    if(typeof sm.value != 'number'){
        sm.value = parseInt(m.value)||0;
    }
    if(typeof sd.value != 'number'){ 
        sd.value = parseInt(m.value)||0;
    }
    cof = getCof(m.value,d.value,sm.value,sd.value);
    correct = getCorrect(cof,m.value,sm.value);
    return `${correct}${type} + (100${met} * ${cof})`;
}

function getCalc(met,m,d,sm,sd){
    if((m.value === d.value)&&(m?.unit?.backupUnit !== d?.unit?.backupUnit)){
        return `${m.value}${m?.unit?.backupUnit||''}`
    }
    return `calc(${getForm(met,m,d,sm,sd)})`;
}

module.exports = {
    install: function(less, pluginManager, functions) {
        functions.add('fw',function(m=0,d,sm={value:320},sd={value:1920}){
            d?.value === undefined ? d = m : d;

            if((m.value === d.value) && (m?.unit?.backupUnit === d?.unit?.backupUnit)){
                if(m.value === 0){
                    return `${m.value}`;
                }
                return `${m.value}${m?.unit?.backupUnit||''}`
            }

            return getCalc('vw',m,d,sm,sd,'fw');
        });

        functions.add('fh',function(m=0,d,sm={value:240},sd={value:1080}){
            d?.value === undefined ? d = m : d;

            if((m.value === d.value) && (m?.unit?.backupUnit === d?.unit?.backupUnit)){
                if(m.value === 0){
                    return `${m.value}`;
                }
                return `${m.value}${m?.unit?.backupUnit||''}`
            }

            return getCalc('vh',m,d,sm,sd,'fh');
        });

        functions.add('fmin',function(m=0,d,sm={value:240},sd={value:1080}){
            d?.value === undefined ? d = m : d;

            if((m.value === d.value) && (m?.unit?.backupUnit === d?.unit?.backupUnit)){
                if(m.value === 0){
                    return `${m.value}`;
                }
                return `${m.value}${m?.unit?.backupUnit||''}`
            }

            return getCalc('vmin',m,d,sm,sd,'fmin');
        });

        functions.add('fmax',function(m=0,d,sm={value:320},sd={value:1920}){
            d?.value === undefined ? d = m : d;
            if((m.value === d.value) && (m?.unit?.backupUnit === d?.unit?.backupUnit)){
                if(m.value === 0){
                    return `${m.value}`;
                }
                return `${m.value}${m?.unit?.backupUnit||''}`
            }
            return getCalc('vmax',m,d,sm,sd,'fmax');
        });
        
        functions.add('fd',function(m=0,d,wm={value:320},hm={value:240},wd={value:1920},hd={value:1080}){
            d?.value === undefined ? d = m : d;

            if((m.value === d.value) && (m?.unit?.backupUnit === d?.unit?.backupUnit)){
                if(m.value === 0){
                    return `${m.value}`;
                }
                return `${m.value}${m?.unit?.backupUnit||''}`
            }

            return `calc(((${getForm('vw',m,d,wm,wd)}) + (${getForm('vh',m,d,hm,hd)})) / 2)`;
        });
    }
};