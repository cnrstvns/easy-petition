import useSWR from 'swr';
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export default function PetitionList() {
  const { data: petitions } = useSWR('/api/v1/petitions');

  return (
    <ul className="space-y-5">
      {petitions?.map((petition) => <Petition key={petition.id} {...petition} />)}
    </ul>
  );
}

function Petition({
  id, created, title, description, user,
}) {
  return (
    <Link href={`/petitions/${id}`}>
      <div>
        <div className="hover:cursor-pointer overflow-hidden bg-white border px-4 py-4 shadow rounded-md sm:px-6">
          <div className="flex items-center mb-4">
            <img className="h-10 w-10 rounded-full mr-2" src={user?.avatar} />
            <div className="flex-col">
              <div className=" opacity-90 font-medium">
                {user.username}
              </div>
              <div className="text-sm opacity-70 font">
                {dayjs(created).format('LL')}
              </div>
            </div>
          </div>

          <div className="text-xl font-medium">{title}</div>
          <div className="text-md opacity-70">{description}</div>
        </div>
      </div>
    </Link>
  );
}

Petition.propTypes = {
  id: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
};
