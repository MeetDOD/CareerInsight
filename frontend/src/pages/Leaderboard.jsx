import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Confetti from "react-confetti";

const Leaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const poperSizeDetect = () => {
    const width = document.documentElement.clientWidth;
    const height = window.innerHeight;
    setWindowSize({ width, height });
  };

  useEffect(() => {
    window.addEventListener("resize", poperSizeDetect);
    poperSizeDetect();
    return () => {
      window.removeEventListener("resize", poperSizeDetect);
    };
  }, [windowSize]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/leaderboard`
        );
        console.log(data.leaderboard);
        setLeaderboard(data.leaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    fetchLeaderboard();
  }, []);

  // useEffect(() => {
  //     setLoading(true);
  //     const getQuizResults = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${import.meta.env.VITE_BASE_URL}/api/user/getquizresults`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //           }
  //         );
  //         setQuizResults(response.data.quizResults);
  //         console.log(response.data.quizResults);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching quiz results:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     getQuizResults();
  //   }, []);

  return (
    <div>
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}
      <div>
        <div className="min-h-screen">
          <div className="p-3">
            <div className="flex flex-col items-center gap-2 mb-12 mt-5 px-4">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold sm:text-4xl">
                  <span className="text-primary">Top Achievers</span>{" "}
                  Leaderboard
                </h2>
                <p className="mt-2 text-lg font-medium text-gray-500">
                  Celebrating the highest performing individuals rise to the top
                  and shine!
                </p>
              </div>
            </div>
            <div className="shadow-md backdrop-blur-sm rounded-xl p-4 border-2 border-primary lg:mx-32 overflow-x-auto">
              {loading ? (
                <table className="min-w-full">
                  <thead className="text-center text-sm font-medium text-white bg-primary">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-3 sm:px-6 uppercase tracking-wider rounded-l-lg"
                      >
                        Rank
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 sm:px-6 uppercase tracking-wider"
                      >
                        Profile
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 sm:px-6 uppercase tracking-wider"
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 sm:px-6 uppercase tracking-wider rounded-r-lg"
                      >
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <tr key={index}>
                        <td>
                          <Skeleton className="h-10 w-full my-4 skle" />
                        </td>
                        <div className="flex flex-col items-center">
                          <td className="px-5">
                            <Skeleton className="h-12 w-12 my-4 rounded-full skle" />
                          </td>
                        </div>
                        <td className="px-4">
                          <Skeleton className="h-10 w-full my-4 skle" />
                        </td>
                        <td>
                          <Skeleton className="h-10 w-full my-4 skle" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="text-center text-sm font-medium text-white bg-primary">
                      <tr>
                        <th
                          scope="col"
                          className="px-2 py-3 sm:px-6 uppercase tracking-wider rounded-l-lg"
                        >
                          Rank
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 sm:px-6 uppercase tracking-wider"
                        >
                          Profile
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 sm:px-6 uppercase tracking-wider"
                        >
                          Username
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 sm:px-6 uppercase tracking-wider rounded-r-lg"
                        >
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((user, index) => (
                        <tr
                          key={user._id}
                          className={`text-center  border-b-2 border-primary font-semibold ${
                            index % 2 === 0 ? "" : "bg-primary text-white"
                          }`}
                        >
                          <td className="px-2 py-4 sm:px-6">
                            {index === 0 || index === 1 || index === 2 ? (
                              <div className="flex flex-col items-center">
                                <GiTrophyCup
                                  className={
                                    index === 0
                                      ? "text-[#FFD700] text-5xl"
                                      : index === 1
                                      ? "text-[#C0C0C0] text-5xl"
                                      : "text-[#CD7F32] text-5xl"
                                  }
                                />
                              </div>
                            ) : (
                              index + 1
                            )}
                          </td>
                          <td className="px-2 py-4 sm:px-6">
                            <div className="flex flex-col items-center">
                              <img
                                className="h-12 w-12 rounded-full border-2 border-primary"
                                src={user.user.photo}
                                alt="profile-pic"
                              />
                            </div>
                          </td>
                          <td className="px-2 py-4 text-lg font-bold sm:px-6">
                            @{user.user.fullName}
                          </td>
                          <td className="px-2 py-4 sm:px-6 text-lg font-bold">
                            {user.score}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
