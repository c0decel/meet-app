const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const handleInputChanged = (event) => {
      const value = event.target.value;
      setCurrentNOE(value);

      let errorText;
      if (isNaN(value) || value <= 0) {
        errorText = "Invalid input, positive numbers only"
      } else {
        errorText=""
      }
      setErrorAlert(errorText)
    };
  
    return (
      <div id="number-of-events">
        <input
          type="text"
          defaultValue="32"
          onChange={handleInputChanged}
          data-testid="numberOfEventsInput"
        />
      </div>
    );
  };
  
  export default NumberOfEvents;