import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserById, updateUser } from '~/api/user'

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  });
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }) => updateUser(userId, payload), // Update the user with userId and payload
    onSuccess: (data) => {
      console.log('User updated successfully:', data);
      // Invalidate queries to refetch the updated user data or relevant data
      // queryClient.invalidateQueries(['user', userId]); // Ensure you're invalidating the correct query
    },
    onError: (error) => {
      console.error('Error updating user:', error);
    }
  });
};