import React, { useState } from 'react';
import addIcon from '../assets/addIcon.png';
import removeIcon from '../assets/removeIcon.png';

export default function CreatePoll() {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const clearAllData = () => {
    localStorage.clear();
    console.log('Todos os dados do localStorage foram apagados');
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Recupera enquetes existentes
    const storedPolls = localStorage.getItem('polls');
    const existingPolls = storedPolls ? JSON.parse(storedPolls) : [];
  
    // Gera um ID sequencial
    const newId = existingPolls.length > 0 ? existingPolls[existingPolls.length - 1].id + 1 : 1;
  
    const pollData = {
      id: newId,
      title,
      options: options.filter(opt => opt.trim() !== ''),
      startDate,
      endDate,
    };
  
    // Adiciona a nova enquete e salva
    const updatedPolls = [...existingPolls, pollData];
    localStorage.setItem('polls', JSON.stringify(updatedPolls));
  
    console.log('Enquete salva:', pollData);
  
    // Limpa o formulário
    setTitle('');
    setOptions(['', '', '']);
    setStartDate('');
    setEndDate('');
  };
  
  

  return (
    <div className="max-w-none mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-2">Criar enquete</h2>
      <p className="text-center text-sm text-gray-500 mb-6">
        Preencha os seguintes campos para criar a sua enquete
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-5xl mx-auto p-6 rounded-md bg-white shadow-md/30">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite aqui a sua pergunta"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Opções de resposta</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Opção ${index + 1}`}
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="flex items-center gap-2 p-2 px-3 py-2 text-sm bg-red text-white rounded hover:bg-darkred"
              >
                <img src={removeIcon} alt="Remover" className="w-4 h-4"></img>
                <span className="hidden sm:inline">Remover</span>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="flex items-center gap-2 p-2 mt-2 px-4 py-2 text-white bg-blue rounded-md hover:bg-darkblue"
          >
            <img src={addIcon} alt="Add" className="w-5 h-5"></img>
            Adicionar opção
          </button>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de início</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de término</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
  
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="w-50 py-2 px-4 bg-blue text-white font-semibold rounded-md hover:bg-darkblue"
          >
            Criar enquete
          </button>
        </div>
  
        {/* Botão de Limpar Enquetes dentro do formulário, mas sem ser o botão de submit */}
        <div className="flex justify-center w-full mt-4">
          <button
            type="button"  // Definido como "button" para não acionar o submit
            onClick={clearAllData}
            className="w-50 py-2 px-4 bg-red text-white font-semibold rounded-md hover:bg-darkred"
          >
            Limpar enquetes
          </button>
        </div>
      </form>
    </div>
  );
  
}

