import React, { useEffect, useState } from "react";
import { listVariation } from "../../Services/Api";
import Swal from "sweetalert2";

const VariationOptions = ({ Variations, onApply }) => {
  const [options, setOptions] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleAddClick = (index, enValue, arValue) => {
    if (!isDisabled && enValue.trim() !== "" && arValue.trim() !== "") {
      const newOptions = [...options];
      const variationOptions = newOptions[index] || [];
      const variationName = Variations[index];
      variationOptions.push({ en: enValue, ar: arValue, variation: variationName });
      newOptions[index] = variationOptions;
      setOptions(newOptions);

      
      const newInputValues = [...inputValues];
      newInputValues[index] = { en: "", ar: "" };
      setInputValues(newInputValues);
    }
  };

  const handleInputChange = (index, field, value) => {
    if (!isDisabled) {
      const newInputValues = [...inputValues];
      newInputValues[index] = { ...inputValues[index], [field]: value };
      setInputValues(newInputValues);
    }
  };

  const handleRemoveClick = (variationIndex, optionIndex) => {
    if (!isDisabled) {
      const newOptions = [...options];
      newOptions[variationIndex].splice(optionIndex, 1);
      setOptions(newOptions);
    }
  };

  const handleApplyClick = () => {
    setIsDisabled(true);
    onApply(options);
  };


  
    const [VariationsSearch, setVariationsSearch] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                var names=[];
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await listVariation(auth_key, user_id);
                if(!response.status){
                  if(response.msg === "Wrong key"){
                    localStorage.removeItem('token');
                    Swal.fire({
                      position: "center",
                      icon: "error",
                      title: "session exprired",
                      showConfirmButton: false,
                      timer: 3000
                    });
                    setTimeout(() => {
                      window.location.href = "/login";
            
                  }, 3000);
                  }
                }
                console.log(Variations);
                names.push(response.variation_list.find(vid => vid.id === Variations[0]));
                names[0] = names[0].name_en;
                if(Variations.length>1 && typeof Variations[1] != 'undefined'){

                  names.push(response.variation_list.find(vid => vid.id ===Variations[1] ));
                  names[1] = names[1].name_en;
                }
                
                
                setVariationsSearch(names); 
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);
    


  return (
    <div className="col-lg-12 CategoryFormItem">
      <div className="col-lg-5 row">
        {VariationsSearch.map((variation, variationIndex) => (
          <div key={variationIndex} className="col-lg-12 col-md-12 col-sm-12 col-12 AddingControl">
            <div className="VariationControl">
              <label htmlFor={`variation-input-en-${variationIndex}`} className="form-label">
                {variation}
              </label>
              <input
                type="text"
                id={`variation-input-en-${variationIndex}`}
                className="form-control"
                placeholder="En"
                disabled= {isDisabled}
                value={inputValues[variationIndex]?.en || ""}
                onChange={(e) => handleInputChange(variationIndex, "en", e.target.value)}
              />
              <input
                type="text"
                id={`variation-input-ar-${variationIndex}`}
                className="form-control"
                placeholder="Ar"
                disabled= {isDisabled}
                value={inputValues[variationIndex]?.ar || ""}
                onChange={(e) => handleInputChange(variationIndex, "ar", e.target.value)}
              />
              <button
                className="btn btn-dark ApplyBtn"
                onClick={() => {
                  const enValue = inputValues[variationIndex]?.en || "";
                  const arValue = inputValues[variationIndex]?.ar || "";
                  handleAddClick(variationIndex, enValue, arValue);
                  
                }}
              >
                Add
              </button>
            </div>
            <div className="OptionsContainer row" id={`OptionsContainer-${variationIndex}`}>
              {options[variationIndex] &&
                options[variationIndex].map((option, optionIndex) => (
                  <div key={optionIndex} className="col-lg-3 col-md-5 col-sm-3 col-3 OptionContainer">
                    <input
                      type="text"
                      disabled
                      value={`${option.en}-${option.ar}`}
                      className="form-control"
                    />
                    <button
                      className="btn"
                      onClick={() => handleRemoveClick(variationIndex, optionIndex)}
                    >
                      x
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="col-lg-10 mt-3">
        <button className="btn btn-dark" onClick={handleApplyClick} disabled={isDisabled}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default VariationOptions;
