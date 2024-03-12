
function UnitSelector({ unit, handleChangeUnit }) {
  return (
    <div className="unit-selector">
      <label>
        <input type="radio" value="metric" checked={unit === 'metric'} onChange={handleChangeUnit} />
        Métrico
      </label>
      <label>
        <input type="radio" value="imperial" checked={unit === 'imperial'} onChange={handleChangeUnit} />
        Imperial
      </label>
    </div>
  );
}

export default UnitSelector;
