<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Personal_data_model extends CI_Model 
{


	public function get_personal_data($user_id)
	{


			$this->db->select('*');
            $this->db->from('personal_data');
			$this->db->where('personal_data.user_id', $user_id);
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

	}

	

	public function get_id($id)
	{

			$this->db->select('personal_data.*');
			$this->db->from('personal_data');
			$this->db->where('personal_data.id', $id);
			$query = $this->db->get();
			return $query->row();
	}


	


	public function create($categoryData)
	{
		$this->db->insert('personal_data', $categoryData);
		return $this->db->insert_id();
	}




	public function update($id, $categoryData)
	{
		$this->db->where('id', $id);
		$this->db->update('personal_data', $categoryData);
	}



	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('personal_data');
	}

}
