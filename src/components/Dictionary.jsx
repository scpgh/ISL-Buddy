import React, { useState } from 'react';
import { ISL_PHRASES, DICTIONARY_CATEGORIES, ALPHABET_INDEX } from '../data/islData';
import { Search, Gauge, BookOpen, Sparkles, Filter, Check } from 'lucide-react';

export default function Dictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLetter, setActiveLetter] = useState('ALL');
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  const filteredPhrases = ISL_PHRASES.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesLetter =
      activeLetter === 'ALL' ||
      item.english.toUpperCase().startsWith(activeLetter) ||
      (item.category === 'Alphabets' && item.english.toUpperCase().includes(activeLetter));

    const matchesSearch =
      item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hindi.includes(searchTerm) ||
      item.islSyntax.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesLetter && matchesSearch;
  });

  return (
    <div className="pb-24 pt-2 px-2 lg:px-4 w-full min-h-screen">
      
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="font-black text-2xl text-[#4b4b4b] dark:text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#58cc02]" /> ISL Dictionary & Search
        </h2>
        <p className="text-xs text-[#afafaf] dark:text-[#52656d] font-bold">
          Search authentic Indian Sign Language (ISL) dictionary signs with video playback speed controls.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#afafaf]" />
        <input
          type="text"
          placeholder="Search signs in English or Hindi (e.g., Namaste, Family, Help)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[20px] py-3.5 pl-12 pr-4 text-sm font-bold text-[#4b4b4b] dark:text-white placeholder-[#afafaf] focus:outline-none focus:border-[#58cc02] transition-colors shadow-xs"
        />
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {DICTIONARY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all uppercase tracking-wide border-2 ${
              activeCategory === cat
                ? 'bg-[#58cc02] text-white border-[#46a302] shadow-xs scale-105'
                : 'bg-white dark:bg-[#18252b] text-[#4b4b4b] dark:text-white border-[#e5e5e5] dark:border-[#37464f] hover:border-[#58cc02]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* A-Z Alphabet Filter Index */}
      <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[20px] p-2.5 mb-5 shadow-xs overflow-x-auto">
        <div className="flex gap-1.5 min-w-max items-center">
          <span className="text-[10px] font-black text-[#afafaf] uppercase px-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3" /> A-Z Index:
          </span>
          {ALPHABET_INDEX.map((letter) => (
            <button
              key={letter}
              onClick={() => setActiveLetter(letter)}
              className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center transition-all ${
                activeLetter === letter
                  ? 'bg-[#1cb0f6] text-white border-b-2 border-[#1899d6] shadow-xs scale-110'
                  : 'bg-[#f7f7f7] dark:bg-[#131f24] text-[#4b4b4b] dark:text-white border border-[#e5e5e5] dark:border-[#37464f] hover:border-[#1cb0f6]'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Controls */}
      <div className="flex items-center justify-between text-xs text-[#afafaf] dark:text-[#52656d] font-bold mb-4 px-1">
        <span>Showing {filteredPhrases.length} ISL signs</span>
        
        {/* Slow Motion Speed Controls */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-[#18252b] px-3 py-1.5 rounded-full border-2 border-[#e5e5e5] dark:border-[#37464f]">
          <Gauge className="w-3.5 h-3.5 text-[#58cc02]" />
          <span className="text-[11px] font-black text-[#4b4b4b] dark:text-white">Speed:</span>
          {[0.5, 0.75, 1.0].map((spd) => (
            <button
              key={spd}
              onClick={() => setPlaybackSpeed(spd)}
              className={`text-[10px] font-black px-2 py-0.5 rounded-md transition-all ${
                playbackSpeed === spd
                  ? 'bg-[#58cc02] text-white'
                  : 'text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Dictionary Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPhrases.map((item) => (
          <div 
            key={item.id} 
            className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[24px] p-4 shadow-sm overflow-hidden transition-all hover:border-[#58cc02]"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-[10px] font-black text-[#58cc02] bg-[#58cc02]/15 px-2.5 py-0.5 rounded-full border border-[#58cc02]/30 uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-black text-lg text-[#4b4b4b] dark:text-white mt-1">{item.english}</h3>
                <p className="text-xs text-[#ffc800] font-black">{item.hindi}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-[#4b4b4b] dark:text-white bg-[#f7f7f7] dark:bg-[#131f24] px-2 py-1 rounded-lg border-2 border-[#e5e5e5] dark:border-[#37464f] font-bold">
                  ISL: {item.islSyntax}
                </span>
              </div>
            </div>

            {/* Video Player */}
            <div className="rounded-[18px] overflow-hidden border-2 border-[#e5e5e5] dark:border-[#37464f] bg-black aspect-video relative shadow-inner">
              <iframe
                src={item.videoUrl}
                title={item.english}
                className="w-full h-full object-cover"
              ></iframe>
            </div>

            {/* ISL Execution Tip */}
            <p className="mt-3 text-xs text-[#4b4b4b] dark:text-white bg-[#f7f7f7] dark:bg-[#131f24] p-3 rounded-[16px] border-2 border-[#e5e5e5] dark:border-[#37464f] font-bold flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#58cc02] shrink-0 mt-0.5" />
              <span>{item.tips}</span>
            </p>

          </div>
        ))}

        {filteredPhrases.length === 0 && (
          <div className="col-span-2 text-center py-12 text-[#afafaf] font-bold bg-white dark:bg-[#18252b] rounded-[24px] border-2 border-dashed border-[#e5e5e5] dark:border-[#37464f]">
            <p className="text-sm">No ISL signs found matching your search filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All');
                setActiveLetter('ALL');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-[#58cc02] text-white text-xs font-black uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
