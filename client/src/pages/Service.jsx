import { useEffect, useState } from "react";

export const Service = () => {
    const [services, setServices] = useState([]); // Initialize as an array

    const fetchServices = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/data/service", {
                method: "GET",
            });

            if (response.ok) {
                const servicesResData = await response.json();
                setServices(servicesResData.data); // Update state with the fetched data
            } else {
                console.error("Failed to fetch services:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching services:", error); // Log error for debugging
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    console.log("services", services);

    return (
        <div className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>
            <div className="container grid grid-three-cols">
                {services.map((curElem, index) => (
                    <div className="card" key={curElem._id || index}> {/* Use unique ID if available */}
                        <div className="card-img">
                            <img
                                src="/images/services.png"
                                width={200}
                                height={200}
                                alt="Service"
                            />
                        </div>
                        <div className="card-details">
                            <div className="grid grid-two-cols">
                                <p>{curElem.provider}</p> {/* Corrected to 'provider' */}
                                <p>{curElem.price}</p>
                            </div>
                            <h2>{curElem.service}</h2>
                            <p>{curElem.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
