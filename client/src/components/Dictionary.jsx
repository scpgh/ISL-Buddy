import React, { useState } from 'react';
import { ISL_PHRASES, DICTIONARY_CATEGORIES, ALPHABET_INDEX } from '../data/islData';
import { Search, BookOpen, ExternalLink, Play, Gauge } from 'lucide-react';

export default function Dictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [activeModalPhrase, setActiveModalPhrase] = useState(null);

  const filteredPhrases = ISL_PHRASES.filter((item) => {
    const matchesSearch =
      item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hindi.includes(searchTerm) ||
      item.islSyntax.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    const matchesLetter =
      selectedLetter === 'ALL' ||
      item.english.toUpperCase().startsWith(selectedLetter);

    return matchesSearch && matchesCategory && matchesLetter;
  });

  return (
    <div className="pb-24 pt-2 px-2 lg:px-4 w-full">
      
      <div className="mb-6 rounded-[24px] bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] p-5 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-[#1cb0f6]/15 border border-[#1cb0f6]/30 text-[#1cb0f6]">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-black text-xl text-[#4b4b4b] dark:text-white">ISL Dictionary & Sign Search</h2>
            <p className="text-xs font-bold text-[#afafaf] dark:text-[#52656d]">Authentic Indian Sign Language vocabulary with video demonstrations</p>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#afafaf]" />
          <input
            type="text"
            placeholder="Search word in English or Hindi (e.g., Namaste, Thank You, A...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[18px] py-3 pl-12 pr-4 text-sm font-bold text-[#4b4b4b] dark:text-white focus:outline-none focus:border-[#58cc02] transition-colors"
          />
        </div>

        <div className="mb-3">
          <p className="text-[11px] font-black text-[#afafaf] dark:text-[#52656d] uppercase tracking-wider mb-2">Category Filters</p>
          <div className="flex flex-wrap gap-1.5">
            {DICTIONARY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#58cc02] text-white shadow-xs'
                    : 'bg-[#f7f7f7] dark:bg-[#131f24] text-[#afafaf] dark:text-[#52656d] hover:text-[#4b4b4b] dark:hover:text-white border border-[#e5e5e5] dark:border-[#37464f]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-black text-[#afafaf] dark:text-[#52656d] uppercase tracking-wider mb-2">A-Z Index</p>
          <div className="flex flex-wrap gap-1 overflow-x-auto pb-1">
            {ALPHABET_INDEX.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center transition-all ${
                  selectedLetter === letter
                    ? 'bg-[#1cb0f6] text-white shadow-xs'
                    : 'bg-[#f7f7f7] dark:bg-[#131f24] text-[#afafaf] dark:text-[#52656d] hover:bg-[#e5e5e5] border border-[#e5e5e5] dark:border-[#37464f]'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPhrases.map((phrase) => (
          <div
            key={phrase.id}
            className="rounded-[24px] bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] p-4 shadow-sm hover:border-[#58cc02] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#58cc02]/15 text-[#58cc02] border border-[#58cc02]/30">
                  {phrase.category}
                </span>
                <span className="text-xs font-black text-[#ffc800]">{phrase.hindi}</span>
              </div>

              <h3 className="font-black text-lg text-[#4b4b4b] dark:text-white mb-1">{phrase.english}</h3>
              <p className="text-xs font-bold text-[#afafaf] dark:text-[#52656d] mb-3">ISL Order: <span className="text-[#1cb0f6] font-black">{phrase.islSyntax}</span></p>

              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-[#e5e5e5] dark:border-[#37464f] bg-black mb-3">
                <iframe
                  src={phrase.videoUrl}
                  title={phrase.english}
                  className="w-full h-full object-cover"
                ></iframe>
              </div>

              <p className="text-xs text-[#4b4b4b] dark:text-white bg-[#f7f7f7] dark:bg-[#131f24] p-3 rounded-xl border border-[#e5e5e5] dark:border-[#37464f] font-bold mb-3">
                <strong className="text-[#58cc02]">Sign Tip:</strong> {phrase.tips}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#e5e5e5] dark:border-[#37464f]">
              <div className="flex items-center space-x-1">
                <Gauge className="w-3.5 h-3.5 text-[#afafaf]" />
                <span className="text-[10px] font-black text-[#afafaf] uppercase">Speed:</span>
                {[0.5, 0.75, 1.0].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setPlaybackRate(rate)}
                    className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${
                      playbackRate === rate
                        ? 'bg-[#1cb0f6] text-white border-[#1cb0f6]'
                        : 'bg-[#f7f7f7] dark:bg-[#131f24] text-[#afafaf] border-[#e5e5e5] dark:border-[#37464f]'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>

              <a
                href="https://indiansignlanguage.org/search-dictionary/"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-black text-[#58cc02] hover:underline flex items-center gap-1 uppercase"
              >
                ISL Org <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
