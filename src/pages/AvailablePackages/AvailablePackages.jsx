import "./AvailablePackages.css";
import { getPackages } from "../../model/api/api";
import { useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAllPackages } from "../../redux/reducers/packagesReducer";
import { setLoading } from "../../redux/reducers/loadingReducer";
import { packageDisplayType } from '../../constants';	

const displayTypeText = (displayType) => {
  switch (displayType) {
    case packageDisplayType.USER:
      return {
        title: "Paquetes disponibles",
        text: "Si deseas adquirir un paquete, favor de contactar al personal",
        buttonText: "",
      };
    case packageDisplayType.ADMIN_EDIT:
      return {
        title: "Paquetes",
        text: "Paquetes disponibles",
        buttonText: "Editar",
      };
    case packageDisplayType.ADMIN_ADD:
      return {
        title: "Asignar paquete",
        text: "",
        buttonText: "Asignar",
      };
    default:
      return "Paquetes disponibles";
  }
};

export const AvailablePackages = ({ displayType, onButtonClick }) => {
  const availablePackages = useSelector((state) => state.packages);
  const dispatch = useDispatch();

  const showButtonTypes = [
    packageDisplayType.ADMIN_ADD,
    packageDisplayType.ADMIN_EDIT,
  ];

  // if(availablePackages.loading) {
  //     return <Spinner />
  // }\

  const orderPackages = (a, b) => {
    if (parseInt(a.classQuantity) < parseInt(b.classQuantity)) {
      return -1;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    if (
      availablePackages?.pilates.length === 0 &&
      availablePackages?.wellness.length === 0
    ) {
      handleGetPackages();
    }
  }, []);

  const handleGetPackages = async () => {
    dispatch(setLoading(true));
    const response = await getPackages();
    dispatch(setLoading(false));
    response.packages.sort((a, b) => {
      if (a.classQuantity < b.classQuantity) {
        return -1;
      } else {
        return 1;
      }
    });
    const pilatesClasses = response.packages.filter(
      (p) => p.classType === "PILATES"
    );
    const wellnessClasses = response.packages.filter(
      (p) => p.classType === "WELLNESS"
    );
    const combinedClasses = response.packages.filter(
      (p) => p.classType === "COMBINED"
    );    
    
    wellnessClasses.sort(orderPackages);
    pilatesClasses.sort(orderPackages);
    combinedClasses.sort(orderPackages);
    
    dispatch(
      setAllPackages({
        pilates: pilatesClasses,
        wellness: wellnessClasses,
        combined: combinedClasses,
      })
    );
  };

  const { title, text, buttonText } = displayTypeText(displayType);

  return (
    <div className="availablePackagesContainer">
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="packagesAvailable">
        <div className="packagesAvailableContainer">
          <div className="packagesAvailableColumn">
            {availablePackages?.pilates?.length > 0 && <h1>Pilates</h1>}
            {availablePackages?.pilates?.length > 0 &&
              availablePackages.pilates.map((packageAvailable) => {
                return (
                  <div
                    className="packageAvailable"
                    key={packageAvailable.classQuantity}
                  >
                    <h2>
                      {packageAvailable.classQuantity}{" "}
                      {packageAvailable.classQuantity > 1 ? "Clases" : "Clase"}
                    </h2>
                    <p>${packageAvailable.cost}</p>
                    <p className="packageExpire">
                      Caduca en {packageAvailable.expireDays} días
                    </p>
                    {showButtonTypes.includes(displayType) && (
                      <>
                        <Button
                          className="availablePackagesButton"
                          text={buttonText}
                          onClick={() => onButtonClick(packageAvailable)}
                        />
                      </>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="packagesAvailableColumn">
            {availablePackages?.wellness?.length > 0 && <h1>Wellness</h1>}
            {availablePackages?.wellness?.length > 0 &&
              availablePackages.wellness.map((packageAvailable) => {
                return (
                  <div
                    className="packageAvailable"
                    key={packageAvailable.classQuantity}
                  >
                    <h2>
                      {packageAvailable.classQuantity}{" "}
                      {packageAvailable.classQuantity > 1 ? "Clases" : "Clase"}
                    </h2>
                    <p>${packageAvailable.cost}</p>
                    <p className="packageExpire">
                      Caduca en {packageAvailable.expireDays} días
                    </p>
                    {showButtonTypes.includes(displayType) && (
                      <>
                        <Button
                          className="availablePackagesButton"
                          text={buttonText}
                          onClick={() => onButtonClick(packageAvailable)}
                        />
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="packagesAvailableColumn">
            {availablePackages?.combined?.length > 0 && <h1>Combinados</h1>}
            {availablePackages?.combined?.length > 0 &&
              availablePackages.combined.map((packageAvailable) => {
                return (
                  <div
                    className="packageAvailable"
                    key={packageAvailable.classQuantity}
                  >
                    <h2>
                      {packageAvailable.classQuantity}{" "}
                      {packageAvailable.classQuantity > 1 ? "Clases" : "Clase"}
                    </h2>
                    <p>${packageAvailable.cost}</p>
                    <p className="packageExpire">
                      Caduca en {packageAvailable.expireDays} días
                    </p>
                    {showButtonTypes.includes(displayType) && (
                      <>
                        <Button
                          className="availablePackagesButton"
                          text={buttonText}
                          onClick={() => onButtonClick(packageAvailable)}
                        />
                      </>
                    )}
                  </div>
                );
              })}
          </div>
      </div>
    </div>
  );
};
