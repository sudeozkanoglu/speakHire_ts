import React from 'react';
import EducationCard from '../cards/EducationCard';
import TabPanel from '@/components/TabPanel';
import { EducationTabProps } from '../types/profile.types';

const EducationTab: React.FC<EducationTabProps & { value: number; index: number }> = ({
  userProfile,
  editingSections,
  onToggleEdit,
  value,
  index,
  onUpdated
}) => {
  return (
    <TabPanel value={value} index={index}>
      <EducationCard
        education={userProfile.education || []}
        isEditing={editingSections.education}
        onToggleEdit={onToggleEdit}  
        userProfile={userProfile}
        onUpdated={onUpdated}
      />
    </TabPanel>
  );
};

export default EducationTab;