export function TableTopCheckbox ({isActive, handleChange , children }){

    return(
        <label className="">
            <input type="radio" checked={isActive} onChange={() => handleChange(children)} className="hidden peer" />
            <span className="flex p-2 bg-slate-500 items-center rounded-md justify-center transition-all cursor-pointer hover:bg-slate-600 peer-checked:bg-slate-700 peer-checked:cursor-auto">{children}</span>
        </label>
    )
}