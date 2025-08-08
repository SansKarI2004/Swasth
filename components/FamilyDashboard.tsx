import React, { useState } from 'react';
import { familyData } from '../data/mockData';
import { FamilyMember } from '../types';
import ProfileSelector from './family/ProfileSelector';
import MemberDashboard from './family/MemberDashboard';
import MedicalInventory from './family/MedicalInventory';

const FamilyDashboard: React.FC = () => {
    const [members] = useState<FamilyMember[]>(familyData);
    const [selectedMemberId, setSelectedMemberId] = useState<string>(members[0].id);

    const selectedMember = members.find(m => m.id === selectedMemberId)!;

    if (!selectedMember) {
        return <div className="text-center p-8">Error: Could not find selected family member.</div>;
    }

    return (
        <div className="space-y-8">
            <ProfileSelector 
                members={members}
                selectedMemberId={selectedMemberId}
                onSelectMember={setSelectedMemberId}
            />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                <div className="xl:col-span-2">
                    <MemberDashboard member={selectedMember} />
                </div>
                <div className="xl:col-span-1">
                    <MedicalInventory 
                        documents={selectedMember.documents}
                        memberName={selectedMember.name}
                    />
                </div>
            </div>
        </div>
    );
};

export default FamilyDashboard;