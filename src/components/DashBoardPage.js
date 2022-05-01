import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "@sweetalert/with-react";

const DashboardPage = (props) => {
  const { jobs } = props;
  const [applicationData, setApplicationData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [count, setCount] = useState(10)
  const [activeFilter, setActiveFilter] = useState('')

  useEffect(() => {
      axios
          .get("https://dct-application-form.herokuapp.com/users/application-forms")
          .then((res) => {
              const result = res.data;
              //console.log(result);
              setApplicationData(result);
              setOriginalData(result.reverse());
          });
  }, []);

  /* filter By JobTitle */
  const filterBy = (jobTitle) => {
      setActiveFilter(jobTitle)
      const result = applicationData.filter((application) => {
          return application.jobTitle.includes(jobTitle);
      });
      setOriginalData(result);
  };

  const handleViewDetails = (id) => {
    axios
      .get(
        `http://dct-application-form.herokuapp.com/users/application-form/${id}`
      )
      .then((res) => {
        const result = res.data;
        swal({
          buttons: {
            cancel: "Close",
          },
          content: (
            <div className="text-left">
              <h6>Job Profile</h6>
              <hr />
              <p>Conatct Number : {result.phone}</p>
              <p>Email : {result.email}</p>
              <p>Skills : {result.skills}</p>
              <p>Experience : {result.experience}</p>
              <hr />
            </div>
          ),
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateApplication = (user) => {
    const result = originalData.map((application) => {
      if (application._id === user._id) {
        return { ...application, ...user };
      } else {
        return { ...application };
      }
    });
    setOriginalData(result);
  };

  const handleUpdateStatus = (status, id) => {
    axios
      .put(
        `http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,
        {
          status: status,
        }
      )
      .then((res) => {
        const result = res.data;
        updateApplication(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const loadMOre = () => {
      setCount(count + 10)
  }

  return (
    <>
      {applicationData.length > 0 && (
        <div className="bg-white p-3 container my-5 rounded">
          <h1 className="mb-3">Admin Dashbord</h1>
          <div className="row">
            <div className="col-md-12 d-flex gap-2 overflow-x-auto">
              {jobs.map((job, i) => {
                return (
                  <button
                    type="button"
                    className={`btn  d-sm-block mb-2 ${job === activeFilter ? 'btn-primary active': 'btn-outline-primary'}`}
                    key={i}
                    onClick={() => filterBy(job)}
                  >
                    {job}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Technical Skills</th>
                  <th scope="col">Experience</th>
                  <th scope="col">Applied Date</th>
                  <th scope="col">View Details</th>
                  <th scope="col">Update Application Status</th>
                </tr>
              </thead>
              <tbody>
                {originalData.slice(0,count).map((app) => {
                  return (
                    <tr key={app._id}>
                      <td>{app.name}</td>
                      <td>{app.skills}</td>
                      <td>{app.experience}</td>
                      <td>{app.createdAt}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            handleViewDetails(app._id);
                          }}
                        >
                          View Details
                        </button>
                      </td>
                      <td>
                        <>
                          {app.status === "applied" && (
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                className="btn btn-success btn-sm "
                                onClick={() => {
                                  handleUpdateStatus("shortlisted", app._id);
                                }}
                              >
                                Short List
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  handleUpdateStatus("rejected", app._id);
                                }}
                              >
                                Reject
                              </button>
                            </div>
                          )}
                          {app.status === "shortlisted" && (
                            <button
                              type="button"
                              className="btn btn-success btn-sm "
                            >
                              Shortlisted
                            </button>
                          )}
                          {app.status === "rejected" && (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                            >
                              Rejected
                            </button>
                          )}
                        </>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-center my-4">
              <button type="button" className="btn btn-primary btn-sm"
                onClick={loadMOre}
              >
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg> Load More
              </button>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
