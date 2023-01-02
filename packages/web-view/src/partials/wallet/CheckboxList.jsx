export default function CheckboxList({ checks }) {
  return (
    <ul className="space-y-2">
      {checks.map((check, index) => (
        <li>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" defaultChecked={index === 0}/>
            <span className="text-sm text-slate-600 font-medium ml-2 italic">{check}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
