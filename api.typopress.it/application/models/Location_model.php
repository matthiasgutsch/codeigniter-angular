<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Location_model extends CI_Model 
{


	public function get_locations($user_id)
	{

			$this->db->select('*');
            $this->db->from('locations');
			$this->db->where('locations.user_id', $user_id);
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

	}

	

	public function get_id($id)
	{

			$this->db->select('locations.*');
			$this->db->from('locations');
			$this->db->where('locations.id', $id);
			$query = $this->db->get();
			return $query->row();
	}


	


	public function create($categoryData)
	{
		$this->db->insert('locations', $categoryData);
		return $this->db->insert_id();
	}




	public function update($id, $categoryData)
	{
		$this->db->where('id', $id);
		$this->db->update('locations', $categoryData);
	}



	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('locations');
	}

}
