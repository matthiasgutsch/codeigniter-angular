<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Works_model extends CI_Model 
{


	public function get_works($user_id)
	{
		$this->db->select('*');
            $this->db->from('works');
			$this->db->where('works.user_id', $user_id);
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }
	}

	

	public function get_id($id)
	{

			$this->db->select('works.*');
			$this->db->from('works');
			$this->db->where('works.id', $id);
			$query = $this->db->get();
			return $query->row();
	}



public function get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description)
	{

			$this->db->select('*');
            $this->db->from('works');
			$this->db->like('works.category_name', $category_name);
			$this->db->like('works.category_description', $category_description);
			$this->db->where('works.user_id', $user_id);

			$this->db->order_by('id', 'DESC'); 
			if ($_start == 0 &&  $_limit != '') {
	            $this->db->limit($_limit);
	        } else if ($_start != 0  && $_limit != '') {
	            $this->db->limit($_limit,$_start);
	        }


		    $query  = $this->db->get();
			
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return array();
            }

	

}


	

	public function count_works($category_name=NULL, $category_description=NULL, $user_id)
	{
	$this->db->select('*');
	$this->db->from('works');
	$this->db->where('works.user_id', $user_id);

	if($category_name!=NULL)
    $this->db->like('category_name', $category_name);
	if($category_description!=NULL)
    $this->db->like('category_description', $category_description);
	
	return $this->db->count_all_results();
	
	}



	public function create($categoryData)
	{
		$this->db->insert('works', $categoryData);
		return $this->db->insert_id();
	}




	public function update($id, $categoryData)
	{
		$this->db->where('id', $id);
		$this->db->update('works', $categoryData);
	}



	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('works');
	}

}
