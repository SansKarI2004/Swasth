import React from 'react';
import { FamilyMember } from '../../types';

interface ProfileSelectorProps {
  members: FamilyMember[];
  selectedMemberId: string;
  onSelectMember: (id: string) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ members, selectedMemberId, onSelectMember }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-text-primary mb-4">Family Profiles</h2>
      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
        {members.map(member => (
          <button
            key={member.id}
            onClick={() => onSelectMember(member.id)}
            aria-pressed={selectedMemberId === member.id}
            className={`text-center cursor-pointer p-3 rounded-xl transition-all duration-200 flex-shrink-0 w-28 h-32 flex flex-col justify-center items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${selectedMemberId === member.id ? 'bg-primary-light' : 'hover:bg-gray-100'}`}
          >
            <img src={member.avatarUrl} alt={member.name} className={`w-16 h-16 rounded-full mx-auto border-4 object-cover ${selectedMemberId === member.id ? 'border-primary' : 'border-transparent'}`} />
            <p className={`mt-2 font-semibold text-sm truncate ${selectedMemberId === member.id ? 'text-primary-dark' : 'text-text-secondary'}`}>{member.name}</p>
          </button>
        ))}
        <button className="flex-shrink-0 flex flex-col items-center justify-center w-28 h-32 bg-gray-100 rounded-xl text-text-secondary hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
             <i className="fas fa-plus text-2xl text-white"></i>
          </div>
          <p className="mt-2 font-semibold text-sm">Add New</p>
        </button>
      </div>
    </div>
  );
};

export default ProfileSelector;