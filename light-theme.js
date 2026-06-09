import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');

const replacements = [
    // Text colors
    [/text-white/g, 'text-slate-900'],
    [/text-slate-100/g, 'text-slate-900'],
    [/text-slate-200/g, 'text-slate-800'],
    [/text-slate-300/g, 'text-slate-700'],
    [/text-slate-400/g, 'text-slate-600'],
    [/text-slate-450/g, 'text-slate-500'],
    [/text-slate-500/g, 'text-slate-500'],
    
    // Backgrounds
    [/bg-slate-950/g, 'bg-slate-50'],
    [/bg-slate-900/g, 'bg-white'],
    [/bg-slate-800/g, 'bg-slate-100'],
    [/bg-slate-850/g, 'bg-slate-50'],
    [/bg-\[\#111114\]/g, 'bg-slate-50'],
    [/bg-\[\#09090b\]/g, 'bg-white'],
    [/bg-\[\#0c0c0e\]/g, 'bg-slate-50'],
    
    // Borders
    [/border-slate-900/g, 'border-slate-200'],
    [/border-slate-800/g, 'border-slate-200'],
    [/border-slate-850/g, 'border-slate-200'],
    [/border-slate-700/g, 'border-slate-300'],
    [/border-slate-600/g, 'border-slate-300'],
    
    // Indigo accents (from previous step, replace with deep blue for light theme)
    [/indigo-400/g, 'blue-600'],
    [/indigo-500/g, 'blue-600'],
    [/indigo-600/g, 'blue-700'],

    // Emerald accents 
    [/emerald-400/g, 'emerald-600'],
    // emerald-500 stays emerald-500

    // Specific fixes
    [/bg-slate-900\/[0-9]+/g, 'bg-white'],
    [/bg-slate-950\/[0-9]+/g, 'bg-slate-50'],
    [/border-slate-800\/[0-9]+/g, 'border-slate-200'],
    [/border-blue-500\/[0-9]+/g, 'border-blue-200'],
    [/bg-blue-500\/[0-9]+/g, 'bg-blue-50'],
    [/bg-emerald-500\/[0-9]+/g, 'bg-emerald-50'],
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    replacements.forEach(([pattern, replacement]) => {
        content = content.replace(pattern, replacement);
    });

    fs.writeFileSync(file, content);
});

console.log('Conversion to Light Theme completed.');
