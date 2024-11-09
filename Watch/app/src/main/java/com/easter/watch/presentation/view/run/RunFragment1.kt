package com.easter.watch.presentation.view.run

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.AnimationUtils
import android.widget.Toast
import androidx.core.view.isGone
import androidx.core.view.isInvisible
import com.easter.watch.R
import com.easter.watch.databinding.ActivityAuthBinding
import com.easter.watch.databinding.FragmentRun1Binding
import com.easter.watch.databinding.FragmentRun2Binding

class RunFragment1 : Fragment() {

    private var _binding: FragmentRun1Binding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // DataBinding 초기화
        _binding = FragmentRun1Binding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.stopBtn.setOnClickListener{
            //Toast.makeText(requireContext(), "기록 완료", Toast.LENGTH_SHORT).show()
            val intent = Intent(requireContext(),ResultActivity::class.java)
            startActivity(intent)

        }

        binding.pauseBtn.setOnClickListener {
            Toast.makeText(requireContext(), "기록 중지", Toast.LENGTH_SHORT).show()
            binding.playBtn.isGone = false
            binding.pauseBtn.isGone = true


        }

        binding.playBtn.setOnClickListener {
            Toast.makeText(requireContext(), "기록 재시작", Toast.LENGTH_SHORT).show()
            binding.playBtn.isGone = true
            binding.pauseBtn.isGone = false
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null // 메모리 누수 방지를 위해 바인딩 해제
    }
}