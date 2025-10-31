import { useEffect, useState } from "react";
import fundoDragonBall from "../assets/fundoDragonBall.png";
import arrowLeft from "../assets/chevron-left.png";
import arrowright from "../assets/chevron-right.png";

export default function DragonBall() {
  const [DragonName, setDragonName] = useState([]);
  const [escolha, setEscolha] = useState(null);
  const [detalhes, setDetalhes] = useState(null);
  const [index, setIndex] = useState(0);

  const limit = 80;
  const randonName = Math.floor(Math.random() * 80);

  async function fetchDragonName() {
    try {
      const responDragon = await fetch(
        `https://dragonball-api.com/api/characters?limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (responDragon.ok) {
        const dragonData = await responDragon.json();
        setDragonName(dragonData.items);
        console.log(dragonData.items);
      } else {
        toast.error("Erro na Requisição");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleArrowRight() {
    setIndex((prevIndex) =>
      prevIndex + 1 < DragonName.length ? prevIndex + 1 : 0
    );
  }

  function handleArrowLeft() {
    setIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : DragonName.length - 1
    );
  }

  async function fetchNameRandon() {
    try {
      const resRandoName = await fetch(
        `https://dragonball-api.com/api/characters/${randonName}`
      );
      const randonData = await resRandoName.json();
      setDetalhes(randonData);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchEscolhaDragon(id) {
    if (!id) return;

    try {
      const responEscolha = await fetch(
        `https://dragonball-api.com/api/characters/${id}`
      );
      const dataEscolha = await responEscolha.json();

      setDetalhes(dataEscolha);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (escolha) {
      fetchEscolhaDragon(escolha);
    }
  }, [escolha]);

  useEffect(() => {
    fetchDragonName();
  }, []);

  useEffect(() => {
    if (DragonName.length > 0) {
      setDetalhes(DragonName[index]);
    }
  }, [index, DragonName]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: detalhes?.originPlanet?.image
          ? `url(${detalhes.originPlanet.image})`
          : `url(${fundoDragonBall})`,
      }}
    >
      <div
        className="bg-orange-500/90 relative mt-[10rem] rounded-2xl shadow-2xl p-8 flex flex-col md:flex-col items-center max-w-4xl w-[200rem] mx-4 
                      transform transition duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,165,0,0.9)] "
      >
        {/* Imagem do personagem */}
        {DragonName.length > 0 ? (
          <>
            <div className=" absolute top-[-3rem] flex gap-3 justify-start w-full ml-[4rem]">
              <select
                onChange={(e) => setEscolha(e.target.value)}
                defaultValue=""
                className="font-bold text-yellow-500 bg-gray-800 border-2 border-amber-200 rounded-lg p-2"
              >
                <option
                  value=""
                  className="font-bold border-2 border-amber-200"
                >
                  Transformations
                </option>
                {DragonName.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
              {/* <button
                onClick={fetchNameRandon}
                className="font-bold text-yellow-500 bg-gray-800 border-2 border-amber-200 rounded-lg p-2 cursor-pointer"
              >
                Randon
              </button> */}
            </div>

            {detalhes && (
              <>
                <button
                  onClick={handleArrowLeft}
                  className="absolute cursor-pointer animate-pulse"
                >
                  <img
                    className="cursor-pointer"
                    src={arrowLeft}
                    alt="arrowLeft"
                  />
                </button>

                <div className="flex flex-shrink-0">
                  {detalhes && (
                    <>
                      {/* Renderiza a imagem principal */}
                      <img
                        src={detalhes.image}
                        alt={detalhes.name}
                        className="absolute top-[-13rem] w-100 h-100 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse"
                      />

                      {/* Renderiza as transformações, se existirem */}
                      {detalhes.transformations &&
                        detalhes.transformations.map((transformation, idx) => (
                          <img
                            key={idx}
                            src={transformation.image}
                            alt={transformation.name}
                            className={`absolute ${
                              idx === 0
                                ? "left-[-24rem] top-[-15rem]"
                                : idx === 1
                                ? "right-[-22rem] top-[-15rem]"
                                : idx === 2
                                ? "top-[-15rem] w-[10rem] h-[20rem] left-[45rem]"
                                : idx === 3
                                ? "hidden"
                                : "hidden" // Ajuste para transformações adicionais
                            } w-100 h-160 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse`}
                          />
                        ))}
                    </>
                  )}
                </div>

                <div className="text-white md:ml-8 mt-6 md:mt-0 space-y-4">
                  <h2 className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg animate-bounce">
                    {detalhes.name}
                  </h2>
                  <p className="text-lg">
                    <span className="font-bold text-yellow-200">Raça:</span>{" "}
                    {detalhes.race}
                  </p>
                  <p className="text-lg">
                    <span className="font-bold text-yellow-200">Ki:</span>{" "}
                    {detalhes.ki}
                  </p>
                  <p className="text-base leading-relaxed text-gray-100 bg-black/40 p-3 rounded-lg ">
                    {detalhes.description}
                  </p>
                </div>
                <button
                  onClick={handleArrowRight}
                  className="absolute right-0 "
                >
                  <img
                    className="cursor-pointer animate-pulse"
                    src={arrowright}
                    alt="arrowRight"
                  />
                </button>
              </>
            )}
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}
